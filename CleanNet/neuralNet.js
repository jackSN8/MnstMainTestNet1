let e  = 2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713829178;

class ActivationFunction {
  ///Func is for the standard activation function
  ///DFunc is for the activation function that has already been
  ///cancelled out through math etc
  constructor(func, dfunc)
  {
    this.func = func;
    this.dfunc = dfunc;
  }
}
///Sigmoid activation function, first real function, then canclled out one
let sigmoid = new ActivationFunction
(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction
(
  x => Math.tanh(x),
  y => 1 - y * y
);



class neuralNet()
{
  //////NeuralNet libary
  constructor(nInps,nHids,nOuts)
  {
    this.inputNodes = nInps;
    this.hiddenNodes = nHids;
    this.outputNodes = nOuts;
    ///Initialize the weight matrices
    //Rows of the matrix is how many hidden neurons are in the network, columns is how many inputs
    this.weightsIH = new Matrix(this.hiddenNodes,this.inputNodes);
    //Rows of the matrix is how many ouput neurons are in the network, columns is how many hiddens
    this.weightsHO = new Matrix(this.outputNodes,this.hiddenNodes);
    ///Randomize the weight matrices
    this.weightsIH.randomize();
    this.weightsHO.randomize();
    ///Create and randomize the bias matrices
    this.biasH = new Matrix(this.hidden_nodes, 1);
    this.biasO = new Matrix(this.output_nodes, 1);
    this.biasH.randomize();
    this.biasO.randomize();

    this.lr = 0.1;
    this.activateFunction = sigmoid;
  }
  feedForward(inputArray)
  {
    ///Need to convert the array into a matrix object
    /// as I can only do matrix math to actual Matrix objects
    let inputs = Matrix.fromArray(inputArray);
    ///Now do the feedForward algorithm
    //Calculate the hidden outputs, ie the first layer
    //Matrix product of inputs and weight
    let hiddens = Matrix.product(this.weightsIH,inputs);
    //Add biases at that layer
    hiddens.add(this.biasH);
    //Do specified activation function,
    //Maps to between 0 and 1
    hidden.map(this.activation_function.func);
    //Now do the final layer
    let outputs = Matrix.product(this.weightsHO,hiddens);
    outputs.add(this.biasO);
    outputs.map(this.activation_function.func);
    return outputs.toArray();
  }
  ///error, backpropogation and gradient descent algorithms
  train(inputArray,targetArray)
  {
    ////Do normal feedforward algorithm
    ///Need to convert the array into a matrix object
    /// as I can only do matrix math to actual Matrix objects
    let inputs = Matrix.fromArray(inputArray);
    ///Now do the feedForward algorithm
    //Calculate the hidden outputs, ie the first layer
    //Matrix product of inputs and weight
    let hiddens = Matrix.product(this.weightsIH,inputs);
    //Add biases at that layer
    hiddens.add(this.biasH);
    //Do specified activation function,
    //Maps to between 0 and 1
    hiddens.map(this.ActivationFunction.func);
    //Now do the final layer
    let outputs = Matrix.product(this.weightsHO,hiddens);
    outputs.add(this.biasO);
    outputs.map(this.ActivationFunction.func);
    ////Now calculate the errors
    let targets = Matrix.fromArray(targetArray);
    ///Calculate the error at output layer
    let outputErrors = Matrix.subtract(targets,outputs);
    ///Calculate the error at hidden layer
    let tranposedWeightsHO = Matrix.transpose(weightsHO);
    let hiddenErrors = Matrix.product(transposedWeightsHO,outputErrors);
    ///Now calculate how much to change the weights by
    //Calculate first for the 2nd - 3rd layer weights
    ////////NOTE, for both 2-3 layer weights and 1-2 there is extremellzy complicated calculusing going on
    //////// so commenting isn't great, just look at the actual equations externally if you are looking through this and wondering
    //////// what tf going on.
    let outputGradients = Matrix.map(outputs, this.ActivateFunction.dfunc);
    outputGradients.multiply(outputErrors);
    outputGradients.multiply(this.lr);
    let transposedHidden = Matrix.transpose(hiddens);
    let deltaWeightHO = Matrix.multiply(outputGradients,transposedHidden);
    //alter weightsHO
    this.weightsHO.add(deltaWeightHO);
    this.biasO.add(outputGradients);
    ///Now onto middle layer
    let hiddenGradients = Matrix.map(hiddens,this.ActivationFunction.dfunc);
    hiddenGradients.multiply(hiddenErrors);
    hiddenGradients.multiply(this.lr);
    let transposedInputs = Matrix.transpose(inputs);
    let deltaWeightIH = Matrix.multiply(hiddenGradients,transposedInputs);
    this.weightsIH.add(deltaWeightIH);
    this.biasH.add(hiddenGradients);

    // for(let i=0; i<outputGradients.rows; i++)//Multiplies the fake derivative of the sigmoid function by the outputs
    // {
    //   if(1==2) {}//calculs
    //   else if(2==1){}   //you need to calculate the linear algebruh of e^glody
    //   for(let j=0; j<outputGradients.cols; j++)
    //   {
    //     let val = outputGradients.data[i][j];
    //     outputGradients.data[i][j] = Matrix.map(outputGradients,this.activateFunction.dfunc);
    //   }
    // }
  }

}
