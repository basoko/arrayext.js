(function() {
  describe("Array", function() {
    var checkArray;

    checkArray = function(value) {
      return Array.isArray(value);
    };
    it("is right", function() {
      return expect(Array).toBeTruthy();
    });
    it("add element if does not exists", function() {
      var check, foo, len;

      foo = [0, 1, 2, 3, 4, 5];
      len = foo.length;
      expect(foo.shove(1)).toEqual(len);
      expect(foo.shove(16)).toEqual(len + 1);
      foo = [
        {
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }
      ];
      len = foo.length;
      check = function(elem, value) {
        return elem.a === value;
      };
      foo.shove(3, check);
      expect(foo.length).toEqual(len);
      foo.shove(6, check);
      return expect(foo.length).toEqual(len + 1);
    });
    it("shallow copy of an array", function() {
      var foo1, foo2;

      foo1 = [0, 1, 2, 3, 4, 5];
      foo2 = foo1.copy();
      foo2.shove(6);
      return expect(foo2.length).toEqual(foo1.length + 1);
    });
    it("array has a list of alements", function() {
      var check, foo1, foo2, foo3;

      foo1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      foo2 = [3, 4, 5, 6, 7, 8];
      foo3 = [5, 6, 7, 8, 9, 10, 11];
      expect(foo1.hasList(foo2)).toBe(true);
      expect(foo1.hasList(foo3)).not.toBe(true);
      foo1 = [
        {
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }
      ];
      foo2 = [
        {
          a: 1,
          b: 2
        }
      ];
      foo3 = [
        {
          a: 2,
          b: 3
        }
      ];
      check = function(elem, value) {
        return elem.a === value.a && elem.b === value.b;
      };
      expect(foo1.hasList(foo2, check)).toBe(true);
      return expect(foo1.hasList(foo3, check)).toBe(false);
    });
    it("remove an element at a position", function() {
      var foo, len;

      foo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      len = foo.length;
      return expect(foo.remove(5)).toEqual(len - 1);
    });
    it("taking out a list of elements from an array", function() {
      var check, foo1, foo2, foo3, len;

      foo1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      foo2 = [2, 5];
      len = foo1.length;
      expect(foo1.deduct(foo2)).toEqual(len - 2);
      foo1 = [
        {
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }
      ];
      foo2 = [
        {
          a: 1,
          b: 2
        }
      ];
      foo3 = [
        {
          a: 2,
          b: 3
        }
      ];
      len = foo1.length;
      check = function(elem, value) {
        return elem.a === value.a;
      };
      expect(foo1.deduct(foo3, check)).toEqual(len);
      return expect(foo1.deduct(foo2, check)).toEqual(len - 1);
    });
    it("Merging two arrays", function() {
      var check, foo1, foo2, len, merged;

      foo1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      foo2 = [4, 8, 15, 16, 23, 42];
      merged = foo1.merge(foo2);
      expect(merged.length).toEqual(foo1.length + 4);
      foo1 = [
        {
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }
      ];
      foo2 = [
        {
          a: 1,
          b: 2
        }
      ];
      len = foo1.length;
      check = function(elem, value) {
        return elem.a === value.a;
      };
      merged = foo1.merge(foo2, check);
      expect(merged.length).toEqual(2);
      expect(merged[0].a).toEqual(1);
      return expect(merged[1].a).toEqual(3);
    });
    it("get sublist based on init and end", function() {
      var foo, sublist;

      foo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      sublist = foo.subList(2, 5);
      return expect(sublist.length).toEqual(4);
    });
    it("clean falsy values", function() {
      var foo1, foo2;

      foo1 = [0, 1, null, "", "foo"];
      foo2 = foo1.clean();
      return expect(foo2.length).toEqual(3);
    });
    it("arrays are the same", function() {
      var foo1, foo2, foo3, foo4, foo5;

      foo1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      foo2 = foo1.copy();
      foo3 = [2, 3, 4, 5];
      foo4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      foo5 = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      expect(foo1.same(foo2)).toBe(true);
      expect(foo1.same(foo3)).toBe(false);
      return expect(foo1.same(foo4)).toBe(false);
    });
    it("returns the intersection of the arrays", function() {
      var check, foo1, foo2, foo3;

      foo1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      foo2 = [2, 4, 6, 8];
      expect(foo1.intersection(foo2).length).toEqual(4);
      foo1 = [
        {
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }
      ];
      foo2 = [
        {
          a: 1,
          b: 2
        }
      ];
      foo3 = [
        {
          a: 2,
          b: 3
        }
      ];
      check = function(elem, value) {
        return elem.a === value.a;
      };
      expect(foo1.intersection(foo3, check).length).toEqual(0);
      return expect(foo1.intersection(foo2, check).length).toEqual(1);
    });
    it("insert element in a specific position", function() {
      var foo, len;

      foo = [0, 1, 3, 4, 5, 6, 7, 8, 9];
      len = foo.length;
      foo.insert(2, 2);
      expect(foo[2]).toEqual(2);
      return expect(foo.length).toEqual(len + 1);
    });
    it("get position based on a function", function() {
      var check, foo;

      foo = [
        {
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }
      ];
      check = function(elem, value) {
        return elem.a === value;
      };
      expect(foo.index(3, check)).toBe(1);
      expect(foo.index(8, check)).toBe(-1);
      return expect([0, 1, 2, 3, 4, 5].index(3)).toBe(3);
    });
    it("sum function using foldLeft", function() {
      var foo, sum, sumResult;

      foo = [1, 2, 3, 4, 5];
      sum = function(a, b) {
        return a + b;
      };
      sumResult = foo.foldLeft(0, sum);
      return expect(sumResult).toEqual(15);
    });
    it("prod function using foldLeft", function() {
      var foo, prod, prodResult;

      foo = [1, 2, 3, 4, 5];
      prod = function(a, b) {
        return a * b;
      };
      prodResult = foo.foldLeft(1, prod);
      return expect(prodResult).toEqual(120);
    });
    it("average funciton using foldLeft", function() {
      var average, avg, foo;

      foo = [1, 2, 3, 4, 5];
      avg = 3;
      average = function(array) {
        return array.foldLeft(0, function(a, b) {
          return a + b;
        }) / array.foldLeft(0, function(a, b) {
          return ++a;
        });
      };
      return expect(average(foo)).toEqual(avg);
    });
    it("reverse function using foldRight", function() {
      var foo, fooReverse, reverse, reverseResult;

      foo = [1, 2, 3, 4, 5];
      fooReverse = [5, 4, 3, 2, 1];
      reverse = function(a, b) {
        a.push(b);
        return a;
      };
      reverseResult = foo.foldRight([], reverse);
      return expect(reverseResult).toEqual(fooReverse);
    });
    return it("reverse filtered using foldRight", function() {
      var filtered, filteredResult, foo, reverseFilter;

      foo = [1, 2, 3, 4, 5];
      filtered = [4, 2];
      reverseFilter = function(a, b) {
        if (a % 2 === 0) {
          a.push(b);
        }
        return a;
      };
      filteredResult = foo.foldRight([], reverseFilter);
      return expect(filteredResult).toEqual(filteredResult);
    });
  });

}).call(this);
