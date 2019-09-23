# python3

import sys

nTables, nMerges = map(int, sys.stdin.readline().split())
cRows = list(map(int, sys.stdin.readline().split()))
maxSize = max(cRows)

class Table:
	def __init__(self, countRows, i):
		self.parent = self
		self.rank = 0
		self.i = i
		self.size = countRows

	def addRows(self, rowsLen):
		self.size += rowsLen

	def clearRows(self):
		self.size = 0


class DisjoinSet:

	def union(indexT1, indexT2):
		p1 = DisjoinSet.find(indexT1)
		p2 = DisjoinSet.find(indexT2)

		if p1 == p2:
			return

		if (p1.rank > p2.rank):
			p1.addRows(p2.size)
			p2.parent = p1
			p2.clearRows()

			return p1
		else:
			p2.addRows(p1.size)
			p1.parent = p2
			p1.clearRows()

			if (p2.rank == p1.rank):
				p2.rank += 1

			return p2

	def find(table):
		t = table;
		parent = t.parent;

		if(table != table.parent):
			table.parent = DisjoinSet.find(table.parent)

		return t.parent


tables = []

for i in range(nTables):
	table = Table(cRows[i], i)

	if (maxSize < table.size):
		maxSize = table.size

	tables.append(table)

for i in range(nMerges):
	t1, t2 = map(int, sys.stdin.readline().split())
	table = DisjoinSet.union(tables[t1 - 1], tables[t2 - 1])

	if (table and maxSize < table.size):
		maxSize = table.size

	print(maxSize)
