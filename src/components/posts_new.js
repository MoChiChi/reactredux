import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component {
    renderField(field) {
        //"field" = (a single piece of state) The field argument contains an event handler or two that is going to be responsible for making sure that the Field in <form> knows that it is responsible for dealing with this very particular text input.
        
        const { meta: { touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // this=== component
        this.props.createPost(values, () => {
            this.props.history.push('/'); //this must match one of the route created in index.js
        });
        
    }
    
    render() {
        const { handleSubmit } = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    //"label" can be what ever name it is just a variable
                    label="Title"
                    name="title"
                    component={this.renderField} //Now I do notice that I am not putting any parentheses in here we are just providing a reference to a function because the field will call that function at some point in the future.
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField} 
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField} 
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    //console.log(values)
    const errors = {}; // errors object starts off as completely empty

    // Validate the inputs from 'values'
   
    if(!values.title) {
        errors.title = "Enter a title";
    }

    if(!values.categories) {
        errors.categories = "Enter come categories";
    }

    if(!values.content) {
        errors.content = "Enter some content please";
    }

    // If errors is empty, the form is fine to submit
    // If errors has ay properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewform'
    //String need to be unique, this allow you to have multiple form on a page
    //this allows reduxForm to communicate with the formReducers 
})(
    connect(null, { createPost })(PostsNew)

);