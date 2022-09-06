import { Request, Response } from "express";

const postModel = require("../models/post");

class PostController {
  async list(request: Request, response: Response) {
    const page = parseInt(request.query.page as string) 
    const limit = parseInt(request.query.limit as string)
    const startIndex = (page-1)*limit

    try {
      const result = await postModel.find().limit(limit).skip(startIndex).exec();
      response.json(result);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  async listById(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const result = await postModel.findById(id);
      if (!result) {
        return response.status(400).json({ error: "Post not avaliable" });
      }
      response.json(result);
    } catch (error) {
      return response.status(404).json({ error: "Post not found" });
    }
  }

  async create(request: Request, response: Response) {
    const { title, body, tags } = request.body;
    const data = new postModel({
      title,
      body,
      tags
    });
    if (typeof tags !== "object") {
      return response.status(400).json({ error: "Tags need to be a array" });
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

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, body, tags } = request.body;

    if (!title && !body && !tags) {
      return response
        .status(400)
        .json({ error: "Need to be at least one param" });
    }

    if (tags && typeof tags !== "object") {
      return response.status(400).json({ error: "Tags need to be a array" });
    }
    try {
      const oldData = await postModel.findById(id);
      if (!oldData) {
        return response.status(404).json({ error: "Post not found" });
      }
      const updatedData = {
        title: title ? title : oldData.title,
        body: body ? body : oldData.body,
        tags: tags ? tags : oldData.tags
      };
      const options = { new: true };
      const result = await postModel.findByIdAndUpdate(
        id,
        updatedData,
        options
      );

      return response.json(result);
    } catch (err) {
      return response.status(400).json({ error: "Error updating data!", err });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const post = await postModel.findById(id);
      if (!post) {
        return response.status(400).json({ error: "Post not avaliable" });
      }
      await postModel.findByIdAndDelete(id);
      return response.status(204).json({ message: "Post has been deleted" });
    } catch (error) {
      return response.status(404).json({ error: "Post not found" });
    }
  }
}

export default new PostController();
