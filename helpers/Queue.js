class Executor {
  constructor(queueRequest) {
    this.executing = []
    this.length = this.executing.length
    this.queueRequest = queueRequest
  }
  push(task){
    this.executing.push(task)
    let taskIndex = task.index
    console.log(task)
    task.request().then(response => {
      this.executing = this.executing.filter(r => r.index != taskIndex)
      this.queueRequest.resolved(response)
    }).catch(error => {
      throw error
    })
  }
}

class queueRequest {
  constructor(queueLength = 2) {
    if(queueRequest.exists){
      return queueRequest.instance
    } else {
      this.queue = []
      this.currentIndex = 0
      this.queueLength = queueLength
      queueRequest.instance = this
      queueRequest.exists = true
      this.executor = new Executor(this)
    }
  }
  push(request){
    console.log(request)
    this.queue.push({
      request: request,
      index: this.queue.length
    })
    this.execute()
  }
  execute(){
    if(this.executor.executing.length < this.queueLength && this.currentIndex < this.queue.length){
      this.executor.push({
        request: this.queue[this.currentIndex].request,
        index: this.currentIndex
      })
      this.currentIndex ++
    }
  }
  resolved(response){
    console.log(response)
    this.execute()
  }
}

export {queueRequest}

