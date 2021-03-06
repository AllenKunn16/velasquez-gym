import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { ajax } from "~/helpers/ajax";

import AddFitness from "../../components/admin/add-fitness";
import FitnessList from "../../components/admin/fitness-list";
import AdminNavbar from "../../components/admin/navbar";

const Admin: FC = () => {
  return (
    <div className="d-flex mt-1">
      <Container className="my-auto">
        <AdminNavbar />

        <Card className="mt-2">
          <CardBody style={{ height: "32rem", overflowY: "scroll" }}>
            <AddFitness />
            <FitnessList />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    await ajax.get("/api/auth", {
      withCredentials: true,
      headers: req.headers,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.writeHead(302, {
        // or 301
        Location: "/login",
      });
      res.end();
    }
  }

  return {
    props: {},
  };
};

export default Admin;
