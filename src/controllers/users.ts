import { Request, Response } from "express";
const {compare} = require('bcrypt')
const userModel = require("../models/user");
const {hash} = require('bcrypt')

class UserController {
  async list(request: Request, response: Response) {
    try {
     
      response.json(await userModel.find());
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  async signup(request: Request, response: Response) {
    const { username, password} = request.body;
    const crypPassword = password?await  hash(password,8) : ''
    const data = new userModel({
      username, password : crypPassword
    });
    if (username?.length <5) {
      return response.status(400).json({ error: "Username length need to be at least 5" });
    }
    if (password?.length <8) {
      return response.status(400).json({ error: "Password length need to be at least 8" });
    }
    try {
      const dataToSave = await data.save();
      return response.status(201).json(dataToSave);
    } catch (err) {
      return response
        .status(400)
        .json({ error: "Error registering post", err });
    }
  }

  async signin(request: Request, response: Response) {
    try {
			const { username, password } = request.body;

			const user = await userModel.findOne({ username });

			if (!user) {
				return response.status(401).json({ error: 'Login or password do invalid' });
			}
			if (!await compare(password, user.password)) {
				return response.status(401).json({ error: 'Login or password do invalid' });
			}

			return response.json({
				token: user.loginToken(),
				user,
			});
		} catch (err) {
			return response.status(400).json({ error: 'Unknown error', err });
		}
	}

}

export default new UserController();
