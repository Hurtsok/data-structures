# python3

class HeapBuilder:
  def __init__(self):
    self._swaps = []
    self._data = []

  def ReadData(self):
    n = int(input())
    self._data = [int(s) for s in input().split()]
    self.n = n;

    assert n == len(self._data)

  def WriteResponse(self):
    print(len(self._swaps))
    for swap in self._swaps:
      print(swap[0], swap[1])

  def getLeftIndex(self, i):
    return 2 * i + 1
  

  def getRightIndex(self, i):
    return 2 * i + 2
  
  def getParent(self, i):
    return int((i - 1) / 2)

  def siftDown(self, i):
      length = len(self._data) - 1

      while self.getLeftIndex(i) <= length:
          iLeft = self.getLeftIndex(i)
          iRight = self.getRightIndex(i)
          smallest = i

          if (iLeft <= length and self._data[iLeft] < self._data[smallest]):
            smallest = iLeft

          if iRight <= length and self._data[iRight] < self._data[smallest]:
            smallest = iRight

          if i != smallest:
            current = self._data[i]

            self._data[i] = self._data[smallest]
            self._data[smallest] = current

            self._swaps.append((i, smallest))

            i = smallest
          else:
            i = iLeft

  def GenerateSwaps(self):
    for i in range(int(self.n/2), -1, -1):
      self.siftDown(i);
      

  def Solve(self):
    self.ReadData()
    self.GenerateSwaps()
    self.WriteResponse()

if __name__ == '__main__':
    heap_builder = HeapBuilder()
    heap_builder.Solve()
