import React, { useState } from "react";
import "../globals.css";
import { Block } from "../data";

function Command({ onEnter, passedCommand }: { onEnter: any; passedCommand: string|null }) {
  const [inputValue, setInputValue] = useState<string>("");
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newBlock: Block = { command: inputValue, result: "temp" };
  
      setBlocks((prevBlocks) => {
        const updatedBlocks = [...prevBlocks, newBlock];
  
        // Update local storage after setting the state
        localStorage.setItem("commandData", JSON.stringify(updatedBlocks));
  
        return updatedBlocks;
      });
  
      onEnter(inputValue);
      setInputValue("");
    }
  };
  

  return (
    <div className="command_container">
      <p className="command_prefix">moussacodes@moussacodes:-$</p>
      {passedCommand == null ? (
        <input
          type="text"
          className="command_input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
        />
      ) : (
        <p className="command_text">{passedCommand}</p>
      )}
    </div>
  );
}

export default Command;
