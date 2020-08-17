import React, { Component } from "react";
import BookDataService from "../services/BookService";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    };
  }

  onChangeTitle(element) {
    this.setState({
      title: element.target.value
    });
  }

  onChangeDescription(element) {
    this.setState({
      description: element.target.value
    });
  }

  saveBook() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    BookDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.response,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(element =>  {
        console.log(element);
      });
  }

  newBook() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }
  render() {
    
  }

}