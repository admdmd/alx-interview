#!/usr/bin/python3
""" This is a module for the N queens NP problem.
"""

if __name__ == '__main__':

    import sys

    if len(sys.argv) != 2:
        print("Usage: nqueens N")
        sys.exit(1)
    try:
        size = int(sys.argv[1])
    except ValueError:
        print("N must be a number")
        sys.exit(1)
    if size < 4:
        print("N must be at least 4")
        sys.exit(1)

    def startSolve():
        board = [[0 for j in range(size)] for i in range(size)]
        checkRecursive(board, 0)
        return

    def checkRecursive(board, col):
        if col == size:
            solution(board)
            return True
        ret = False
        for row in range(size):
            if checkPosition(board, row, col):
                board[row][col] = 1
                ret = checkRecursive(board, col + 1) or ret
                board[row][col] = 0
        return ret

    def checkPosition(board, row, col):
        # Check this row on the left side
        for i in range(col):
            if board[row][i]:
                return False
        # Check upper diagonal on the left side
        i, j = row, col
        while i >= 0 and j >= 0:
            if board[i][j]:
                return False
            i -= 1
            j -= 1
        # Check lower diagonal on the left side
        i, j = row, col
        while j >= 0 and i < size:
            if board[i][j]:
                return False
            i += 1
            j -= 1
        return True

    def solution(board):
        solve = []
        for i in range(size):
            for j in range(size):
                if board[i][j] == 1:
                    solve.append([i, j])
        print(solve)

    startSolve()

