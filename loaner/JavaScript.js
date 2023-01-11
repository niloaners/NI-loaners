class User {
    constructor(firstName, lastName, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }
  
  class UI {
    addUserToList(user) {
      const list = document.getElementById('user-list');
  
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${user.password}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td class="center-align">
                  <a class="btn btn-delete red waves-effect waves-dark">
                    <i class="fas fa-trash-alt"></i> Delete
                  </a>
                </td>
        `;
  
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
  
      const container = document.querySelector('.container');
      const form = document.querySelector('#input-form');
      container.insertBefore(div, form);
  
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 2000);
    }
  
    deleteUser(target) {
      if (target.classList.contains('btn-delete')) {
        target.parentElement.parentElement.remove();
      }
    }
  }
  
  class Store {
    static getUsers() {
      let users;
      if (localStorage.getItem('users') === null) {
        users = [];
      } else {
        users = JSON.parse(localStorage.getItem('users'));
      }
  
      return users;
    }
  
    static displayUsers() {
      const users = Store.getUsers();
  
      users.forEach(function (user) {
        const ui = new UI();
  
        ui.addUserToList(user);
      });
    }
  
    static addUser(user) {
      const users = Store.getUsers();
  
      users.push(user);
  
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    static removeUser(password) {
      const users = Store.getUsers();
  
      users.forEach(function (user, index) {
        if (user.password === password) {
          users.splice(index, 1);
        }
      });
  
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
  
  // DOM load Event
  document.addEventListener('DOMContentLoaded', Store.displayUsers);
  
  // Event Listeners
  document.getElementById('input-form').addEventListener('submit', function (e) {
    const firstName = document.getElementById('first_name').value,
      lastName = document.getElementById('last_name').value,
      email = document.getElementById('email').value,
      password = document.getElementById('password').value;
      
  
    const user = new User(firstName, lastName, email, password);
    const ui = new UI();
  
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      ui.showAlert('Please  fill  in all fields!', 'error');
    } else {
      ui.addUserToList(user);
  
      ui.showAlert('User Created', 'success');
  
      Store.addUser(user);
    }
  
    e.preventDefault();
  });
  
  // Delete Event Listener
  document.getElementById('user-list').addEventListener('click', function (e) {
    const ui = new UI();
  
    ui.deleteUser(e.target);
  
    Store.removeUser(
      e.target.parentElement.parentElement.children[0].textContent
    );
  
    ui.showAlert('User Removed!', 'success');
  
    e.preventDefault();
  });