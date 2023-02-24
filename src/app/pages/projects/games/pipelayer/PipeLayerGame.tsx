import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from 'app/styles/main.scss';
import { Random } from "../Random";


const randomSeed = (seedSize: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < seedSize) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const randomColor = (randomState: Random) => {
  let result = '';
  const characters = 'ABCDEF0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(randomState.get(0, charactersLength));
    counter += 1;
  }
  return `#${result}`;
}

const calcRadius = (squareSize: number) => {
  return (squareSize / 2) - (squareSize * 0.3 / 2);
}

interface AnchorPair {
  start: number,
  end: number,
}

interface Flow {
  points: number[],
}

interface GameState {
  flows: Flow[],
  anchorPoints: AnchorPair[],
  minMoves: number,
  currentMoves: number,
}

const PipeLayerGame = ({}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [boardSize, setBoardSize] = React.useState(5);
  const [seed, setSeed] = React.useState(randomSeed(10));
  const [gameState, setGameState] = React.useState<GameState>({flows: [], anchorPoints: [], minMoves: 0, currentMoves: 0});
  let randomState = new Random(seed);

  const drawBoard = React.useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    const squareSize = (context.canvas.height - 16) / boardSize;
    context.beginPath();
    context.lineWidth = 0.8;
    context.strokeStyle = "white";
    const xoff = (context.canvas.width / 2) - (boardSize * squareSize / 2);
    const yoff = (context.canvas.height / 2) - (boardSize * squareSize / 2);
    // draw board
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        context.rect(x * squareSize + xoff, y * squareSize + yoff, squareSize, squareSize);
      }
    }
    context.stroke();
    //draw anchors
    for (let i = 0; i < gameState.anchorPoints.length; i++) {
      const a = gameState.anchorPoints[i];
      const startX = a.start % boardSize;
      const startY = Math.floor(a.start / boardSize);
      const endX = a.end % boardSize;
      const endY = Math.floor(a.end / boardSize);
      context.beginPath();
      context.fillStyle = randomColor(randomState);
      context.arc(startX * squareSize + xoff + (squareSize / 2), startY * squareSize + yoff + (squareSize / 2), calcRadius(squareSize), 0, 2*Math.PI);
      context.fill();
      context.beginPath();
      context.arc(endX * squareSize + xoff + (squareSize / 2), endY * squareSize + yoff + (squareSize / 2), calcRadius(squareSize), 0, 2*Math.PI);
      context.fill();
    }

    // draw border again so it evens out with the other lines
    context.beginPath();
    context.strokeStyle = "white";
    context.rect(xoff, yoff, squareSize * boardSize, squareSize * boardSize);
    context.stroke();
  }, [canvasRef, boardSize, gameState, randomState, seed]);

  const genGameState = React.useCallback((boardSize: number) => {
    let gs: GameState = {flows: [], anchorPoints: [], minMoves: 0, currentMoves: 0};

    const numPoints = boardSize * boardSize;

    for (let i = 0; i < 5; i++) {
      let anchor: AnchorPair = {start: randomState.get(0, numPoints), end: randomState.get(0, numPoints)}
      gs.anchorPoints.push(anchor);
    }

    setGameState(gs);
    
  }, [gameState, seed, boardSize]);

  React.useEffect(() => {
    drawBoard();
  }, [gameState, seed, boardSize]);

  const updateBoardSize = React.useCallback((event: any) => {
    setBoardSize(event.target.value);
    genGameState(event.target.value);
    randomState = new Random(seed);
  }, [randomState, seed, boardSize]);

  const updateSeed = React.useCallback((event: any) => {
    setSeed(event.target.value);
    genGameState(boardSize);
    randomState = new Random(event.target.value);
  }, [randomState, seed, boardSize]);

  const generateSeed = React.useCallback((_: any) => {
    let v = randomSeed(10);
    setSeed(v);
    genGameState(boardSize);
    randomState = new Random(v);
  }, [randomState, seed, boardSize]);

  return (<Row className={styles.pipeLayerBody}>
    <Col md={12}>
      <Row>
        <Col md={6}>
          <label>Seed:</label>
          <input type="text" name="seed" placeholder="Seed" value={seed} onChange={updateSeed}/>
          <Button onClick={generateSeed}>Random Seed</Button>
        </Col>
        <Col md={6}>
          <label>{`Board Size ${boardSize < 10 ? '[ ' : '['}${boardSize}]:`}</label>
          <input type="range" name="size" min={5} max={30} step={1} value={boardSize} onChange={updateBoardSize}/>
        </Col>
      </Row>
      <Row>
        <Col md={3}>{`Min. Moves: ${gameState.minMoves}`}</Col>
        <Col md={3}>{`Moves: ${gameState.currentMoves}`}</Col>
      </Row>
      <Row>
        <Col md={12} className={styles.pipeLayerCanvasContainer}>
          <canvas ref={canvasRef} width={1000} height={1000}/>
        </Col>
      </Row>
    </Col>
    
  </Row>);
};

export default PipeLayerGame;