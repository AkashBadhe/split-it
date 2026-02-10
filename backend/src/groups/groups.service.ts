import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.groupModel.findById(id).exec();
  }

  async create(group: Partial<Group>): Promise<Group> {
    const createdGroup = new this.groupModel(group);
    return createdGroup.save();
  }

  async update(id: string, group: Partial<Group>): Promise<any> {
    return this.groupModel.findByIdAndUpdate(id, group, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.groupModel.findByIdAndDelete(id).exec();
  }
}