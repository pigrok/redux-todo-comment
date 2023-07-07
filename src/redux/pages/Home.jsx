import React from "react";
import Header from "../../componetns/ui/Header";
import Form from "../../componetns/todos/Form";
import List from "../../componetns/todos/List";

function Home() {
  return (
    <div>
      <Header />
      <Form />
      <List isDone={false} />
      <List isDone={true} />
    </div>
  );
}

export default Home;
