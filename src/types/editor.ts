export interface INote {
  content: string;
  userId: string;
  name: string;
  id: string;
}

export interface IFolder {
  name: string;
  noteIds: string[];
  folders: IFolder[];
  id: string;
}
