#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys

file_path = r"E:\matematyka - strona kompedium\arkusze.html"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Verify current line 226 (0-indexed) = file line 227
print("Line 227 starts with:", lines[226][:70])
print("Line 257 starts with:", lines[256][:70])
print("Line 258 starts with:", lines[257][:70])
print(f"Total lines: {len(lines)}")
