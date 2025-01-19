import bcrypt from "bcryptjs";
import { typeUser } from "../types/user";
import { db } from "./db";
import { folder, user } from "./schema";
import { typeFolder } from "../types/folder";

const users: typeUser[] = [
  {
    id_user: "4dfe05fb-ac9d-5598-a59c-f220c2729f22",
    email: "prueba@gmail.com",
    password: "Abcd1234*"
  },
  {
    id_user: "f5c82487-c25f-53be-a69e-8c778195fee5",
    email: "katewzol@nardeha.gi",
    password: "Abcd1234*"
  },
  {
    id_user: "cb851407-db42-5416-ba2f-f4b20d67fd28",
    email: "warcopez@bitfit.re",
    password: "Abcd1234*"
  },
]

const folders: typeFolder[] = [
  {
    id_user: users.at(0)!.id_user,
    id_parent: null,
    id_folder: "2c22438a-53d4-58c8-807f-8259aabc46b6",
    folder_name: "carpeta1"
  },
  {
    id_user: users.at(0)!.id_user,
    id_parent: null,
    id_folder: "3ab7a697-29d1-5fee-bbc1-78db35a09d9b",
    folder_name: "carpeta2"
  },
  {
    id_user: users.at(0)!.id_user,
    id_parent: null,
    id_folder: "2e8edb7a-b54d-5223-a880-b752c8c14b69",
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