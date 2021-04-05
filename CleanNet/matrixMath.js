/////Matrix math libary. Uses a specific matrix object
/////Rather than 2-d arrays so I can customize dimensions?!
class matrix
{
  constructor(tRows,tCols)
  {
    this.rows = tRows;
    this.cols = tCols;
    this.values = [];
    //Initialize the matrix empty
    for(let i=0; i<this.cols; i++)
    {
      this.values[i] = [];
      for(let j=0; j<this.rows; j++)
      {
        this.values[i][j] = 0;
      }
    }
  }

  ///Function to take array input and put it into Matrix
  static arrToMatrix(inputMatrix,inputArray)
  {
    inputMatrix.values = inputArray;
  }
  ///Function to do reverse
  static arrToMatrix(outputMatrix,outputArray)
  {
    outputArray = outputMatrix.values;
  }
  ///Initializes matrix at constructor specified size with random
  ///elements. Initalizes rows then columns
  randomInitialize()
  {
    for(let i=0; i<this.cols; i++)
    {
      this.values[i] = [];
      for(let j=0; j<this.rows; j++)
      {
        this.values[i][j] = random(-1,1);
      }
    }
  }

  ////Matrix math functions
  ////Hadamard product, scalar product.
  //// Standard multiplication, addition
  ////Transpose

  ///hadamard - elentwise multiplcation. both must be same dimensions
  static hadarmardProduct(inputMatrix1,inputMatrix2)
  {
    if(inputMatrix1.rows != inputMatrix2.rows || inputMatrix1.cols != inputMatrix2.cols)
    {
      console.error("Matrices are not the same dimensions");
    }
    else
    {
      let output = new matrix(inputMatrix1.rows,inputMatrix1.cols)
      for(let i=0; i<output.cols; i++)
      {
        for(let j=0; j<output.rows; j++)
        {
          output.values[i][j]=inputMatrix1.values[i][j]*inputMatrix2.values[i][j];
        }
      }
    }
    return output;
  }






}
