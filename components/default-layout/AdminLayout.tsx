import React from "react";
import { Footer, Header, NavBar } from "../layout-part";
import ProtectedPageAdmin from "./ProtectedPage";
import { Flex, Grid, GridItem } from "@chakra-ui/react";

interface IProps {
  children: JSX.Element;
}

const AdminLayout: React.FC<IProps> = ({ children }) => {
  return (
    <ProtectedPageAdmin>
      <style jsx global>{`
        html {
          color-schema: "light";
        }
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: #333;
          font-family: sans-serif;
        }
        h1 {
          font-weight: 700;
        }
        p {
          margin-bottom: 10px;
        }
      `}</style>
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <GridItem
          sx={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          shadow={"2xl"}>
          <NavBar />
        </GridItem>
        <GridItem bgColor={"white"} width={"100%"} height={"100vh"}>
          {children}
        </GridItem>
      </Grid>
    </ProtectedPageAdmin>
  );
};

export default AdminLayout;
