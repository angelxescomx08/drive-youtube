import bcrypt from "bcryptjs";
import { typeUser } from "../types/user";
import { db } from "./db";
import { folder, user } from "./schema";
import { typeFolder } from "../types/folder";

const users: typeUser[] = [
  {
    id_user: "e4600372-9e53-53cc-93e9-8e28ab29746f",
    email: "prueba@gmail.com",
    password: "Abcd1234*"
  },
  {
    id_user: "cca95948-b0f3-58e9-b7be-3c56db881a19",
    email: "ve@fip.gq",
    password: "Abcd1234*"
  },
  {
    id_user: "98b2634d-54c0-59d4-8e82-182cd5bc3196",
    email: "her@sif.kg",
    password: "Abcd1234*"
  },
]

const folders: typeFolder[] = [
  {
    id_folder: "e452a171-0141-555c-880b-9b5931ce0d4d",
    id_parent: null,
    id_user: users.at(0)!.id_user,
    folder_name: "carpeta1"
  },
  {
    id_folder: "c601075f-28db-596c-bef2-304213d33577",
    id_parent: null,
    id_user: users.at(0)!.id_user,
    folder_name: "carpeta2"
  },
  {
    id_folder: "ad09ce64-55a9-5626-90ee-07a944741b6b",
    id_parent: null,
    id_user: users.at(0)!.id_user,
    folder_name: "carpeta3"
  },
]

async function populateUsers() {
  const newUsers = users.map(user=>({
    ...user,
    password: bcrypt.hashSync(user.password)
  }))
  await db.insert(user).values(newUsers)
}

async function populateFolders() {
  await db.insert(folder).values(folders)
}

async function populate(){
  await populateUsers()
  await populateFolders()
}

populate()