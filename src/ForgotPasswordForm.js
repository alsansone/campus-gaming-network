import React, { Component } from "react";

class ForgotPasswordForm extends Component {
  handleKeyUp = event => {
    if (event.keyCode === 13) {
      this.handleSubmit(event);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form
        onKeyUp={this.handleKeyUp}
        onSubmit={this.handleSubmit}
        className="bg-grey-darkest shadow-lg rounded px-8 pt-6 pb-8 mb-4 text-white"
      >
        <h1 className="text-center pb-2 pt-2">Forgot your password?</h1>
        <p className="text-grey-dark text-center pb-8">
          We'll email you instructions on how to reset it.
        </p>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            autoFocus
            className="bg-grey-lightest appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <button
          className="mt-6 w-full bg-orange hover:bg-orange-dark text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    );
  }
}

export default ForgotPasswordForm;