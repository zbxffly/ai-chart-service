const express = require('express');
const { generateExcalidrawJSON } = require('../ai/excalidraw-generator');

const router = express.Router();

// Simple text parser (rule-based, no external AI)
function parseTextToGraph(text) {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  // Extract steps from patterns like:
  // "步骤1: XX → 步骤2: YY"
  // "Step 1: XX -> Step 2: YY"
  // "A → B → C"

  // Pattern 1: Chinese steps
  const stepPattern = /步骤\s*(\d+)[:：]\s*([^→\n]+)/g;
  let match;
  const stepMap = new Map();

  while ((match = stepPattern.exec(text)) !== null) {
    const stepNum = match[1];
    const stepText = match[2].trim();
    const id = `node-${nodeId++}`;

    nodes.push({
      id,
      label: stepText,
      type: 'rectangle'
    });

    stepMap.set(stepNum, id);
  }

  // Pattern 2: Arrow flow "A → B → C"
  if (nodes.length === 0) {
    const arrowPattern = /([^→\n]+)\s*→\s*/g;
    let prevId = null;

    text.split('→').forEach((part, index) => {
      const label = part.trim().replace(/^(步骤|Step)\s*\d+[:：]\s*/, '');
      if (label) {
        const id = `node-${nodeId++}`;
        nodes.push({ id, label, type: 'rectangle' });

        if (prevId) {
          edges.push({ from: prevId, to: id });
        }
        prevId = id;
      }
    });
  } else {
    // Create edges from step sequence
    const sortedSteps = Array.from(stepMap.entries()).sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < sortedSteps.length - 1; i++) {
      edges.push({ from: sortedSteps[i][1], to: sortedSteps[i + 1][1] });
    }
  }

  // Fallback: if no nodes found, create one
  if (nodes.length === 0) {
    nodes.push({
      id: `node-${nodeId++}`,
      label: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      type: 'rectangle'
    });
  }

  return { nodes, edges };
}

// POST /api/generate
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }

    // Parse text to graph
    const { nodes, edges } = parseTextToGraph(text);

    // Generate Excalidraw JSON
    const excalidrawData = generateExcalidrawJSON(nodes, edges);

    res.json({
      success: true,
      data: excalidrawData
    });
  } catch (error) {
    console.error('Error generating chart:', error);
    res.status(500).json({
      error: 'Failed to generate chart',
      message: error.message
    });
  }
});

module.exports = router;
