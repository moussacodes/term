"use client";
import { create } from 'zustand'


import React, { useEffect, useState } from "react";
import Command from "./Command";
import { Block } from "../data";
import { parseCommand } from '../utils/terminal';
import "../globals.css";
import Result from "./Result";

function Terminal() {
  let initialFileTree = {"folders": {"projects": {}}, "links": {}, "commands": {}}
  let resultOutput: string = ""
  useEffect(() => {
    retrieveAllBlocks();
  }, []);

  let storedData: Block[] = []
  const [blocks, setBlocks] = useState<Block[]>([]);
  const processCommand = (command: string) => {
    console.log(`Processing command: ${command}`);
    
    let storedData: Block[] = [];

    const storedDataString = localStorage.getItem("commandData");
    if (storedDataString != null) {
      storedData = JSON.parse(storedDataString) || [];
    }

    if(command == "clear"){
      localStorage.removeItem("commandData")
      setBlocks([])
    }else{
      resultOutput = parseCommand(command)
      let tempBlock: Block = {
        command: command,
        result: resultOutput
      };
  
      const updatedData = [...storedData];
      updatedData.push(tempBlock);
    
      localStorage.setItem("commandData", JSON.stringify(updatedData));
  
      setBlocks(updatedData);
    }

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
