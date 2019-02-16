import styled from 'styled-components';

const Popup = styled.div`
  background-color: white;
  width: 600px;
  padding: 20px;
  position: fixed;
  margin-left: -320px;
  left: 50%;
  top: 10%;
  border: 2px solid #5ca0be;
  font-family: Geneva, Arial, Helvetica, sans-serif;

  @media screen and (max-width: 640px) {
    width: calc(100% - 40px);
    top: 0;
    left: 0;
    margin: 0;
    border-radius: 0;
  }

  .edit {
    color: gray;
    width: 25px;
    height: 25px;
    font-size: 1.8em;
    cursor: pointer;
    position: absolute;
    top: 20px;
  }
  
  .edit:hover {
    color: black;
  }

  .cross {
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    width: 45px;
    height: 45px;
    font-size: 45px;
    cursor: pointer;
    position: absolute;
    right: 7px;
    top: 5px;
  }

  .cross:hover {
    color: black;
  }

  input {
    font-size: 26px;
    text-align: center;
    width: 90%;
    margin: 0 0 15px 20px;
  }

  textarea {
    text-align: justify;
    padding: 10px;
    height: 169px;
    width: 523px;
    margin-left: 20px;
    font-size: 18px;
  }

  img {
    width: 300px;
  }
  
  .img {
    margin: 10px 20px 0 150px;
  }

  .actions {
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  
  .primary_button {
    width: 100px;
  }
  
  .alternate_button {
    width: 100px;
  }
`;

export default {
  Popup,
}