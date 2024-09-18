const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');



app.use(express.json());
app.use('/users', userRoutes);
//app.use('/complaints', complaintRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
