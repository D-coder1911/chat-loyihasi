import userService from "./user.service.js";

class UserController {
  #_service;
  constructor() {
    this.#_service = userService;
  }

  async getAllUsers(req, res) {
    const data = await this.#_service.getAllUsers();
    res.send(data);
  }
}

export async function getAllUsers(req, res) {
  const data = await userService.getAllUsers();
  res.send(data);
}


export async function createUser(req, res) {
    const {name} = req.body;
    const data = await userService.createUser(name);
    
  }

export default new UserController();
