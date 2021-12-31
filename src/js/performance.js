self.addEventListener("message", something);

const something = (e) => {
  console.log(e.data);
  
}