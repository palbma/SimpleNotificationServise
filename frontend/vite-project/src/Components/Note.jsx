import { Card, CardBody, CardFooter, CardHeader, Divider, Heading, Text } from '@chakra-ui/react';
export default function Note({title,decription,createdAt}){
    return(<Card variant = {"filled"}>
        <CardHeader>
          <Heading size={"md"}>{title}</Heading>
        </CardHeader>
        <Divider borderColor = {"gray"}/>
        <CardBody>
          <Text>{decription}</Text>
        </CardBody>
        <CardFooter>{createdAt}</CardFooter>
      </Card>);
}