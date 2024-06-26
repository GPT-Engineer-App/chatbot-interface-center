import { Container, VStack, Box, Text, Input, Button, useToast, Icon } from "@chakra-ui/react";
import { FaUser, FaGavel, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Message is empty.",
        description: "You can't send an empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");
    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: "Hello! How can I help you today?", sender: "bot" }]);
    }, 1000);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box width="100%" p={4} bg="gray.200" borderRadius="lg" boxShadow="2xl" height="66vh" overflowY="auto">
          {messages.map((message, index) => (
            <Text key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "blue.100" : "brand.800"} p={2} borderRadius="md" m={1} display="flex" alignItems="center">
              <Icon as={message.sender === "user" ? FaUser : FaGavel} mr={2} />
              {message.text}
            </Text>
          ))}
        </Box>
        <Box width="100%" display="flex" boxShadow="lg">
          <Input placeholder="Type your message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <Button leftIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleSendMessage} ml={2}>
            Send
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
