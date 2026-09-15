import e from "express";
const app=e()
app.get("/",(req,resp)=>{
    resp.send(
        {
            message:"done",
            success:true
        }
    )
})
app.listen(3200);
