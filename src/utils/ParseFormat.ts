class ParseFormat {

    parseStringAsArray(arrayAsString: string){
        return arrayAsString.split(',').map(need => need.trim());
    }

}

export default ParseFormat