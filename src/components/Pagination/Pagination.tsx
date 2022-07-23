import { useEffect, useState, useRef } from 'react';
import { HStack, Button } from '@chakra-ui/react';

type PaginationProps = {
  sum: number;
  per: number;
  onChange: ({ page }: { page: number }) => void;
};

export const Pagination = ({ sum, per, onChange }: PaginationProps) => {
  const isFirstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange({ page: currentPage });
  }, [currentPage]);

  const totalPage = Math.ceil(sum / per);

  const handleBack = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleForward = () => {
    if (currentPage === totalPage) return;
    setCurrentPage(currentPage + 1);
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(totalPage);
  };

  const handleMove = (page: number) => {
    setCurrentPage(page);
  };

  let pages;

  if (currentPage === 1) {
    pages = [...Array(totalPage).keys()].map((page) => {
      page++;
      return page <= 3 ? (
        page === 1 ? (
          <Button
            key={page}
            bg="secondary.500"
            _hover={{ bg: 'secondary.200' }}
            onClick={() => handleMove(page)}
          >
            {page}
          </Button>
        ) : (
          <Button
            key={page}
            _hover={{ bg: 'secondary.200' }}
            onClick={() => handleMove(page)}
          >
            {page}
          </Button>
        )
      ) : null;
    });
  } else if (currentPage === totalPage) {
    pages = [...Array(totalPage).keys()].map((page) => {
      page++;
      return page >= currentPage - 2 ? (
        page === currentPage ? (
          <Button
            key={page}
            bg="secondary.500"
            _hover={{ bg: 'secondary.200' }}
            onClick={() => handleMove(page)}
          >
            {page}
          </Button>
        ) : (
          <Button
            key={page}
            _hover={{ bg: 'secondary.200' }}
            onClick={() => handleMove(page)}
          >
            {page}
          </Button>
        )
      ) : null;
    });
  } else {
    pages = [...Array(totalPage).keys()].map((page) => {
      page++;
      return page >= currentPage - 1 && page <= currentPage + 1 ? (
        page === currentPage ? (
          <Button
            key={page}
            bg="secondary.500"
            _hover={{ bg: 'secondary.200' }}
            onClick={() => handleMove(page)}
          >
            {page}
          </Button>
        ) : (
          <Button
            key={page}
            _hover={{ bg: 'secondary.200' }}
            onClick={() => handleMove(page)}
          >
            {page}
          </Button>
        )
      ) : null;
    });
  }

  return (
    <HStack mt={5} justify="center" color="black">
      {totalPage !== 0 && (
        <>
          {currentPage >= 3 ? (
            <Button
              _hover={{ bg: 'secondary.200' }}
              onClick={() => handleFirst()}
            >
              First
            </Button>
          ) : null}
          {currentPage >= 2 ? (
            <Button
              _hover={{ bg: 'secondary.200' }}
              onClick={() => handleBack()}
            >
              &lt;
            </Button>
          ) : null}
          {pages}
          {currentPage === totalPage ? null : (
            <Button
              _hover={{ bg: 'secondary.200' }}
              onClick={() => handleForward()}
            >
              &gt;
            </Button>
          )}
          {currentPage === totalPage ? null : (
            <Button
              _hover={{ bg: 'secondary.200' }}
              onClick={() => handleLast()}
            >
              Last
            </Button>
          )}
        </>
      )}
    </HStack>
  );
};
