
export async function cleanDb() {
     await db.collection("sessions").deleteMany({});
     await db.collection("transactions").deleteMany({});
     await db.collection("Users").deleteMany({});

} 