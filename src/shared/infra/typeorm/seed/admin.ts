import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = await uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license)
    values('${id}','Artur3','arturpeixoto@gmail.com', '${password}', true, 'now()', 'XXXXXX')
    `
  );
  await connection.close;
}

create().then(() => console.log("user admin created!"));
