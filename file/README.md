- js 读取文件的机制  
FileReader类型实现的是一种异步文件读取机制。  
FileReader 提供了如下 几个方法。 
- readAsText(file,encoding)：以纯文本形式读取文件，将读取到的文本保存在 result 属 性中。第二个参数用于指定编码类型，是可选的。
- readAsDataURL(file)：读取文件并将文件以数据 URI的形式保存在 result 属性中。  
- readAsBinaryString(file)：读取文件并将一个字符串保存在 result 属性中，字符串中的 每个字符表示一字节。   
- readAsArrayBuffer(file)：读取文件并将一个包含文件内容的 ArrayBuffer 保存在 result 属性中。 这些读取文件的方法为灵活地处理文件数据提供了极大便利。例如，可以读取图像文件并将其保存 为数据 URI，以便将其显示给用户，或者为了解析方便，可以将文件读取为文本形式。 
