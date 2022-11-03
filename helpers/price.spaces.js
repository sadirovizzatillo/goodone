const priceSpacer = (price) => {
    return price.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, '_')
  }
  
  export default priceSpacer