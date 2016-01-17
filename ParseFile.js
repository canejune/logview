function parseLogFile(contents) {
    logLines = []
    startTimeMs = -1
    var lines = contents.toString().split("\n");
    var total = lines.length
    var logLines = []
    var message = {
        total:0,
        current: 0,
        done:false,
        logLines:{}}
        
    for (i in lines) {
//        if (logViewData.gllTimeTag) {
            var t = lines[i].match(/\d+:\d+:\d+\.\d+/)
            if (t) {
                tstr = t[0].split(":")
                timeMs = parseFloat(tstr[2]) * 1000 + parseInt(tstr[1]) * 1000 * 60 + parseInt(tstr[0]) * 1000 * 60 * 60
                if (startTimeMs == -1) {
                    startTimeMs = timeMs
                }
                var oneLogLine = {tMs:(timeMs - startTimeMs), line:lines[i]}
                logLines.push(oneLogLine)
                message.total = total
                message.current = i
                message.done = false
                
                postMessage(message)
            }                
 //       }
 //       else {
 //           var t = lines[i].match(/\d+:\d+:\d+:\d+/)
 //           if (t) {
 //               tstr = t[0].split(":")
 //               timeMs = parseInt(tstr[3]) + parseInt(tstr[2]) * 1000 + parseInt(tstr[1]) * 1000 * 60 + parseInt(tstr[0]) * 1000 * 60 * 60
 //               if (startTimeMs == -1) {
 //                   startTimeMs = timeMs
 //               }
 //               var oneLogLine = {tMs:(timeMs - startTimeMs), line:lines[i]}
 //               logLines.push(oneLogLine)
 //               postMessage({total:total, current: i, done:false, logLines:logLines})
 //           }
 //       }
    }
    message.total = total
    message.current = i
    message.done = true
    message.logLines = logLines
                
    postMessage(message)
}

self.addEventListener('message', function(e) {
    var data = e.data
    parseLogFile(data.contents)  
})