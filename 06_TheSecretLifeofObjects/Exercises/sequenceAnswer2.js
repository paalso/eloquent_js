// https://eloquentjavascript.net/2nd_edition/06_object.html
// https://eloquent-javascript.karmazzin.ru/chapter6#interfeis-k-posledovatelnostyam
// https://eloquentjavascript.net/2nd_edition/code/#6.3


// Sequence interface
// ===================

// This alternative approach represents the empty sequence as null,
// and gives non-empty sequences two methods:
//
// * head() returns the element at the start of the sequence.
// 
// * rest() returns the rest of the sequence, or null if there are no
//   elemements left.
//
// Because a JavaScript constructor can not return null, we add a make
// function to constructors of this type of sequence, which constructs
// a sequence, or returns null if the resulting sequence would be
// empty.

function logFive2(sequence) {
    for (var i = 0; i < 5 && sequence != null; i++) {
      console.log(sequence.head());
      sequence = sequence.rest();
    }
  }
  
  function ArraySeq2(array, offset) {
    this.array = array;
    this.offset = offset;
  }
  ArraySeq2.prototype.rest = function() {
    return ArraySeq2.make(this.array, this.offset + 1);
  };
  ArraySeq2.prototype.head = function() {
    return this.array[this.offset];
  };
  ArraySeq2.make = function(array, offset) {
    if (offset == null) offset = 0;
    if (offset >= array.length)
      return null;
    else
      return new ArraySeq2(array, offset);
  };
  
  function RangeSeq2(from, to) {
    this.from = from;
    this.to = to;
  }
  RangeSeq2.prototype.rest = function() {
    return RangeSeq2.make(this.from + 1, this.to);
  };
  RangeSeq2.prototype.head = function() {
    return this.from;
  };
  RangeSeq2.make = function(from, to) {
    if (from > to)
      return null;
    else
      return new RangeSeq2(from, to);
  };
  
  logFive2(ArraySeq2.make([1, 2]));
  // → 1
  // → 2
  logFive2(RangeSeq2.make(100, 1000));
  // → 100
  // → 101
  // → 102
  // → 103
  // → 104