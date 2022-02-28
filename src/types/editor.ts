export interface INote {
  content: string;
  userId: string;
  name: string;
  _id: string;
}

export interface IFolder {
  name: string;
  noteIds: string[];
  folders: IFolder[];
}
