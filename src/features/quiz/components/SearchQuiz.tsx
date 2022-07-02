import { useState } from 'react';
import { FormControl, Input, Icon, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';

export const SearchQuiz = () => {
  const [input, setInput] = useState<string>("");

  const navigate = useNavigate();

  const handleInputChange = (e: any) => setInput(e.target.value);

  const onSubmit = () => {
    navigate(`/app/quiz/search/${input}`);
    setInput("");
  }


  return (
    <FormControl>
      <Flex align="center">
        <Input 
          type="text" 
          borderRadius="3xl"
          bg="tertiary.100"
          color="black"
          autoComplete="off"
          placeholder="Search quiz"
          value={input} 
          onChange={handleInputChange} 
        />
        <Icon 
          as={SearchIcon} 
          w={6} 
          h={6} 
          _hover={{ cursor: 'pointer' }}
          onClick={onSubmit}
        />
      </Flex>
    </FormControl>
  );
}
