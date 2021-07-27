import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import "./App.css";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from "uuid";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing:null,
      filter:{
        name:'',
        status:-1
      }
    };
    //this.ongenerateData = this.ongenerateData.bind(this);
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  ongenerateData = () => {
    var task = [
      {
        id: uuidv4(),
        name: "Học lập trình ",
        status: true,
      },
      {
        id: uuidv4(),
        name: "Đi bơi",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Đi ngủ ",
        status: true,
      },
    ];

    this.setState({
      tasks: task,
    });
    localStorage.setItem("tasks", JSON.stringify(task));
  };

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !==null){
      console.log('th1')
      this.setState({
        isDisplayForm: true,
        taskEditing:null
      });
    }
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
      taskEditing:null
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };
  
  onAlwaysCloseForm = ()=>{
    this.setState({
      isDisplayForm:null
    })
   
  }
  
  onShowForm = ()=>{
    this.setState({
      isDisplayForm:true
    })
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if(data.id===''){
      data.id = uuidv4();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
   
    this.setState({
      tasks: tasks,
      taskEditing:null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //localStorage.removeItem('tasks');
  };

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    //console.log(index);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
        taskEditing : null,
        
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    //console.log(index);
    if (index !== -1) {
      tasks.splice(index,1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    //this.onCloseForm();
    this.onAlwaysCloseForm();
  }

  onUpdate = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
   //console.log(taskEditing);
    // this.setState({
    //   taskEditing : tasks[index]
    // });
    this.setState({
      taskEditing : taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName,filterStatus)=>{
      console.log(filterName,  ' - ' , filterStatus);
      
      filterStatus = parseInt(filterStatus);
      this.setState({
          name:filterName.toLowerCase(),
          status:filterStatus
      })

  }

  render() {
    
    var { tasks, isDisplayForm,taskEditing,filter } = this.state;
    if(filter){
      if(filter.name){
        tasks=tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
    }
    var elmTaskForm =
      isDisplayForm  ? 
        <TaskForm onCloseForm={this.onCloseForm} 
        onSubmit={this.onSubmit} 
        taskEditing={taskEditing}/>
       : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm === true
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : "col-xs-0 col-sm-0 col-md-0 col-lg-0"
            }
          >
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.onToggleForm()}
            >
              <span className="fa fa-plus mr-5"> Thêm Công Việc </span>
            </button>

            <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={() => this.ongenerateData()}
            >
              Generate Data
            </button>
            <div className="row mt-15">
              <Control />
            </div>
            <div className="row mt-15">
              <TaskList
                tasks={tasks}
                onUpdateStatus={this.onUpdateStatus}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                onFilter={this.onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
