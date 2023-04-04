import { Box, Divider, Title, Select, Input, Stack } from "@mantine/core";
import React from "react";
import { backgroundColor } from "@/type/const";
import { useState, useEffect } from "react";
import { getStoreList } from "../../fetchMethod/order";
import Head from "next/head";
import { useAppSelector } from "@/store/hooks";
import { selectWishList } from "@/features/roleFeature/roleFeature";

function Pay() {
  const [deliveryWay, setDeliveryWay] = useState("0");
  const [stores, setStores] = useState([]);
  const products = useAppSelector(selectWishList)
  useEffect(() => {
    getStoreList(1).then((res) => {
      // setStores(res?.storeList.map((item)=>{
      // }))
    });
  });
  return (
    <>
      <Head>
        <title>Pay</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          height: "80vh",
          backgroundColor,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "3rem 5rem",
        }}
      >
        <Box sx={{ minWidth: "10rem", width: "50%", backgroundColor: "white" }}>
          <Title sx={{ margin: "2rem" }}>DELIVERY OPTIONS</Title>
          <Divider />

     
          <Select
            label="Pick Up One Delivery Way"
            placeholder="Pick one"
            data={[
              { value: "0", label: "In-store Pickup" },
              { value: "1", label: "Express Delivery" },
            ]}
            value={deliveryWay}
          />
          {deliveryWay === "0" ? (
            <Select
              label="All Store Availiable"
              placeholder="Pick one"
              data={[
                { value: "0", label: "In-store Pickup" },
                { value: "1", label: "Express Delivery" },
              ]}
              value={deliveryWay}
            />
          ) : (
            <Input placeholder="Your Address" />
          )}
        </Box>
    

      </Box>
    </>
  );
}

export default Pay;