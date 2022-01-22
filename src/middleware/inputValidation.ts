import express from "express";

const validateInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
 
  const fileName = req.params.fileName + '.jpg';
  const width = Number(req.query.width) || null;
  const height = Number(req.query.height) || null;
    console.log('validation')
  if (!fileName  ) {
    res.status(400).send("Missing file name");
      return;
  }
  if (!height) {
    res.status(400).send("Missing height");
      return;
  }
  else if (height <= 0) {
    res.status(400).send("height must be number above 0");
      return;
  }
  if (!width) {
    res.status(400).send("Missing width");
      return;
  }
  else if (width <= 0) {
     res.send("width must be number above 0");
      return;
  }
  next();
};
export default validateInput;