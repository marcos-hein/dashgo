import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Link from "next/link";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
import Pagination from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";

export default function UserList(): JSX.Element {
  const { data, isLoading, isFetching, error } = useQuery(
    "users",
    async () => {
      const { data: responseData } = await api.get("users");

      const users = responseData.users.map(user => {
        return {
          ...user,
          createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };
      });

      return users;
    },
    {
      staleTime: 1000 * 5, // 5 seconds
    },
  );

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  function renderError(): JSX.Element {
    return (
      <Flex justify="center">
        <Text>Falha ao obter dados dos usuários.</Text>
      </Flex>
    );
  }

  function renderContent(): JSX.Element {
    return isLoading ? (
      <Flex justify="center">
        <Spinner />
      </Flex>
    ) : (
      <>
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={["4", "4", "6"]} color="gray.300" width="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Usuários</Th>
              {isWideVersion && <Th>Data de cadastro</Th>}
              <Th width="8" />
            </Tr>
          </Thead>
          <Tbody>
            {data.map(user => (
              <Tr key={user.name}>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{user.name}</Text>
                    <Text fontSize="sm" color="gray.300">
                      {user.email}
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && <Td>{user.createdAt}</Td>}
                <Td>
                  {isWideVersion && (
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="pink"
                      variant="ghost"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    >
                      Editar
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination />
      </>
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {error ? renderError() : renderContent()}
        </Box>
      </Flex>
    </Box>
  );
}
