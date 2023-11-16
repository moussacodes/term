export const parseCommand = (command: string): string =>{
    let result: string = ""
    switch(command){
        case "ls":
            result = parseLs()
            break;
        default:
            result = commandNotFound(command)
    }
    return result
    
}

const parseLs = (): string => {
    // let storedFolders: String[] = []
    // let res: string = ""
    // const storedDataString = localStorage.getItem("fodlers");
    // if (storedDataString != null) {
    //     storedFolders = JSON.parse(storedDataString) || [];
    // }

    // storedFolders.map(f =>{
    //     res += f
    //     res+= "\n"
    // })
    // return res

    return "Command not implemented yet"

  }


  const commandNotFound = (command: string): string =>{
    return "Command '"+command +"' not found"
  }