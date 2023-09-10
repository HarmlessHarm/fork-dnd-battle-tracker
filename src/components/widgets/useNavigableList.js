import { useState, useEffect } from 'react';

function isHotkeyForward(e, horizontal) {
  const code = horizontal ? 39 : 40;
  return e.keyCode === code;
}

function isHotkeyBackward(e, horizontal) {
  const code = horizontal ? 37 : 38;
  return e.keyCode === code;
}

function isHotkeyHome(e) {
  return e.keyCode === 36;
}

function isHotkeyEnd(e) {
  return e.keyCode === 35;
}

export default function useNavigableList({
  items,
  parentRef,
  horizontal = false,
  onNavigate = () => {},
}) {
  const [focusedItem, setFocusedItem] = useState(null);

  useEffect(() => {
    const getNextItemForward = (prev) => {
      if (prev === null) return 0;
      const next = prev + 1;
      if (next === items.length) return 0;
      return next;
    };

    const getNextItemBackward = (prev) => {
      const next = prev - 1;
      if (next === -1) return items.length - 1;
      return next;
    };

    const hotKeyHandler = (e) => {
      if (isHotkeyHome(e)) {
        e.preventDefault();
        setFocusedItem(0);
        onNavigate();
      }
      if (isHotkeyEnd(e)) {
        e.preventDefault();
        setFocusedItem(items.length - 1);
        onNavigate();
      }
      if (isHotkeyForward(e, horizontal)) {
        setFocusedItem(getNextItemForward);
        onNavigate();
      }
      if (isHotkeyBackward(e, horizontal)) {
        setFocusedItem(getNextItemBackward);
        onNavigate();
      }
    };

    if (parentRef.current) {
      const parent = parentRef.current;
      parent.addEventListener('keydown', hotKeyHandler);
      return () => parent.removeEventListener('keydown', hotKeyHandler);
    }
    return null;
  }, [items, onNavigate]);

  return [focusedItem, setFocusedItem];
}
