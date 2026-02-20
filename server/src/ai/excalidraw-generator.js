/**
 * Excalidraw JSON Generator
 * Converts nodes and edges to Excalidraw format
 */

function generateExcalidrawJSON(nodes, edges) {
  const elements = [];

  // Positioning
  const startX = 100;
  const startY = 100;
  const boxWidth = 200;
  const boxHeight = 80;
  const gapX = 280;
  const gapY = 120;

  // Track node positions
  const nodePositions = new Map();

  // Generate rectangles and text for nodes
  nodes.forEach((node, index) => {
    const x = startX + (index % 3) * gapX;
    const y = startY + Math.floor(index / 3) * gapY;

    nodePositions.set(node.id, { x, y, width: boxWidth, height: boxHeight });

    // Rectangle
    elements.push({
      type: 'rectangle',
      version: 1,
      versionNonce: Math.floor(Math.random() * 1000000),
      isDeleted: false,
      id: `rect-${node.id}`,
      fillStyle: 'hachure',
      strokeWidth: 2,
      strokeStyle: 'solid',
      roughness: 2,
      opacity: 100,
      angle: 0,
      x,
      y,
      strokeColor: '#1e1e1e',
      backgroundColor: '#a5d8ff',
      width: boxWidth,
      height: boxHeight,
      seed: Math.floor(Math.random() * 100000),
      groupIds: [],
      frameId: null,
      roundness: { type: 3 },
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false
    });

    // Text label
    elements.push({
      type: 'text',
      version: 1,
      versionNonce: Math.floor(Math.random() * 1000000),
      isDeleted: false,
      id: `text-${node.id}`,
      fillStyle: 'hachure',
      strokeWidth: 1,
      strokeStyle: 'solid',
      roughness: 1,
      opacity: 100,
      angle: 0,
      x: x + 10,
      y: y + 30,
      strokeColor: '#1e1e1e',
      backgroundColor: 'transparent',
      width: boxWidth - 20,
      height: 25,
      seed: Math.floor(Math.random() * 100000),
      groupIds: [],
      frameId: null,
      roundness: null,
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      fontSize: 16,
      fontFamily: 1,
      text: node.label,
      textAlign: 'center',
      verticalAlign: 'middle',
      containerId: `rect-${node.id}`,
      originalText: node.label,
      lineHeight: 1.25
    });
  });

  // Generate arrows for edges
  edges.forEach((edge, index) => {
    const fromPos = nodePositions.get(edge.from);
    const toPos = nodePositions.get(edge.to);

    if (fromPos && toPos) {
      const startX = fromPos.x + fromPos.width / 2;
      const startY = fromPos.y + fromPos.height / 2;
      const endX = toPos.x + toPos.width / 2;
      const endY = toPos.y + toPos.height / 2;

      elements.push({
        type: 'arrow',
        version: 1,
        versionNonce: Math.floor(Math.random() * 1000000),
        isDeleted: false,
        id: `arrow-${index}`,
        fillStyle: 'hachure',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 2,
        opacity: 100,
        angle: 0,
        x: startX,
        y: startY,
        strokeColor: '#1e1e1e',
        backgroundColor: 'transparent',
        width: endX - startX,
        height: endY - startY,
        seed: Math.floor(Math.random() * 100000),
        groupIds: [],
        frameId: null,
        roundness: { type: 2 },
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
        startBinding: null,
        endBinding: null,
        lastCommittedPoint: null,
        startArrowhead: null,
        endArrowhead: 'arrow',
        points: [[0, 0], [endX - startX, endY - startY]]
      });
    }
  });

  // Return Excalidraw format
  return {
    type: 'excalidraw',
    version: 2,
    source: 'https://excalidraw.com',
    elements,
    appState: {
      gridSize: null,
      viewBackgroundColor: '#f8f9fa'
    },
    files: {}
  };
}

module.exports = { generateExcalidrawJSON };
