import{test,expect} from "@playwright/test";
test.describe.parallel("API Testing",()=>{
    const baseUrl="https://reqres.in/api";

    //------------------GET request--------------------------------------------------------------
    test("simple API Test -Assert responce Status",async({request})=>{
        const responce=await request.get(`${baseUrl}/users/2`);
        expect(responce.status()).toBe(200);
    })

    test("simple API Test -Assert Invalid Endpoint",async({request})=>{
        const responce=await request.get(`${baseUrl}/users/non-existing-endpoint`);
        expect(responce.status()).toBe(404);
    })

    test(" API Test -Assert responce Status",async({request})=>{
        const responce=await request.get(`${baseUrl}/users/3`);
        expect(responce.status()).toBe(200);

        const responseBody=JSON.parse(await responce.text());
      //  console.log(responseBody);
        
    })

    test("GET Request - Get User Details",async({request})=>{
        const responce=await request.get(`${baseUrl}/users/1`);
        const responseBody=JSON.parse(await responce.text());

        expect(responce.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe("George");
        expect(responseBody.data.last_name).toBe("Bluth");
        expect(responseBody.data.email).toBeTruthy();

    })
//---------------------POST Request-----------------------------------------------------------
    test("POST Request - Create new User",async({request})=>{
        const responce=await request.post(`${baseUrl}/users`,{
            data:{
                id:1001,
            },
        })
        const responseBody=JSON.parse(await responce.text());
        expect(responseBody.id).toBe(1001);
        expect(responseBody.createdAt).toBeTruthy();
    })

    test("POST Request -Login",async({request})=>{
        const responce =await request.post(`${baseUrl}/login`,{
            data:{
                email:"eve.holt@reqres.in",
                password:"cityslicka",

            },
        });

        const responseBody=JSON.parse(await responce.text());
        expect(responce.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    })

    test("POST Request -login fail",async({request})=>{
        const responce=await request.post(`${baseUrl}/login`,{
            data:{
                email:"eve.holt@reqres.in",

            },
        })
        const responseBody=JSON.parse(await responce.text());
        expect(responce.status()).toBe(400);
        expect(responseBody.error).toBe("Missing password");
    })
    //-------------PUT Request---------------------------------------------------------------------
    test("PUT Request -update user",async({request})=>{
        const responce=await request.put(`${baseUrl}/user/2`,{
            data:{
                name:"Manju",
                job:"Automation",

            },
        })
        const responseBody=JSON.parse(await responce.text());
        expect(responce.status()).toBe(200);
        expect(responseBody.name).toBe("Manju");
        expect(responseBody.job).toBe("Automation");
        expect(responseBody.updatedAt).toBeTruthy();
    })

    //-------------DELETE Request-------------------------------------------------------
    test("DELETE Request- delete user",async({request})=>{
        const responce=await request.delete(`${baseUrl}/user/2`);
        expect(responce.status()).toBe(204);
    })

 
})