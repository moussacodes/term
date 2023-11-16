"use client";

import React, { useEffect, useState } from "react";
import Command from "./Command";
import { Block } from "../data";
import "../globals.css";
import Result from "./Result";

function Terminal() {
  useEffect(() => {
    retrieveAllBlocks();
  }, []);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const processCommand = (command: string) => {
    console.log(`Processing command: ${command}`);
    const storedDataString = localStorage.getItem("commandData");
    const storedData: Block[] = storedDataString
      ? JSON.parse(storedDataString)
      : [];
    const tempCommand =
      storedData.length > 0 ? storedData[storedData.length - 1].command : "null";
      let tempBlock: Block = {command: tempCommand, result: "this is a result"}
      storedData.pop()
      storedData.push(tempBlock)
      localStorage.setItem("commandData", JSON.stringify(storedData));
      setBlocks([...storedData]);
  };
  const retrieveAllBlocks = () => {
    const storedDataString = localStorage.getItem("commandData");
    const storedData: Block[] = storedDataString
      ? JSON.parse(storedDataString)
      : [];
    setBlocks(storedData);
  };

  return (
    <div className="terminal_container">
      {/* <pre className="ascii">
        ███╗   ███╗ ██████╗ ██╗   ██╗███████╗███████╗ █████╗ 
      </pre>
      <pre className="ascii">
        ████╗ ████║██╔═══██╗██║   ██║██╔════╝██╔════╝██╔══██╗ 
      </pre>
      <pre className="ascii">
        ██╔████╔██║██║   ██║██║   ██║███████╗███████╗███████║ 
      </pre>
      <pre className="ascii">
        ██║╚██╔╝██║██║   ██║██║   ██║╚════██║╚════██║██╔══██║ 
      </pre>═════╝ ╚═════╝ ╚═════╝
      <pre className="ascii">
        ██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████║███████║██║  ██║
      </pre>
      <pre className="ascii">
        ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚══════╝╚══════╝╚═╝  ╚═╝ 
      
      </pre> */}

      {blocks.length != 0 ? (
        blocks.map((command, index) => (
          <div key={command.result}>
            <Command onEnter={processCommand} passedCommand={command.command} />
            <Result result={command.result} />
          </div>
        ))
      ) : (
        <></>
      )}

      <Command onEnter={processCommand} passedCommand={null} />
    </div>
  );
}

export default Terminal;
