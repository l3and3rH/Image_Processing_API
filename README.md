This is an API to resize Images. This can be used as an easy way to create placeholder images or resize images over an API

To run this code you first have to compile the TypeScript code to JavaScript by running 'npm run build' or 'npm run test' (to also run the written unit tests)

With 'npm run start' you then could start the project which is running on localhost:3000

To resize the images you first have to drop the images in the 'full' folder located in './src/assets/full/' Then you can resize the image by using the file path: /image/processing/FILENAME?height=NUMBER&width=NUMBER Example for Image called test with height of 500px and witdh of 500px: http://localhost:3000/image/processing/testName.jpg?height=500&width=500
