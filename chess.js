/*
 * Copyright (C) 2009-2010 Nitin Gupta <engupta@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA 
 */
function Chess(){
	this.board = new Array();
	this.board[0] = new Array();
	this.board[1] = new Array();
	this.board[2] = new Array();
	this.board[3] = new Array();
	this.board[4] = new Array();
	this.board[5] = new Array();
	this.board[6] = new Array();
	this.board[7] = new Array();

	this.user = "w";

	this.kcastle = true;
	this.qcastle = true;
	this.Kcastle = true;
	this.Qcastle = true;

	this.enpassant = "";

	this.half = 0;
	this.full = 1;

	this.codes = new Array();
	this.codes["K"] = "&#9812;";
	this.codes["Q"] = "&#9813;";
	this.codes["B"] = "&#9816;";
	this.codes["N"] = "&#9815;";
	this.codes["R"] = "&#9814;";
	this.codes["P"] = "&#9817;";
	this.codes["k"] = "&#9818;";
	this.codes["q"] = "&#9819;";
	this.codes["b"] = "&#9822;";
	this.codes["n"] = "&#9821;";
	this.codes["r"] = "&#9820;";
	this.codes["p"] = "&#9823;";
	this.codes[""] = "&nbsp;";

	this.draught = function (name, x) {
		this.board[x].push(name);
	};

	this.empty = function (x, count) {
		for (var i=0;i<count;i++ )
		{
			this.board[x].push("");
		}
	};

	this.update = function (fen) {
		var x=y=0;
		var board = true;
		var move = false;
		var castles = false;
		var enpassant = false;
		var half = false;
		var full = false;
		this.enpassant = "";
		for (var i=0;i<fen.length;i++ )
		{
			var c = fen.charAt(i);
			if (board)
			{
				if (c == "0" || c == "1" || c == "2" || c == "3" || c == "4"
						|| c == "5" || c == "6" || c == "7" || c == "8")
				{
					var _count = parseInt(c, 10);
					this.empty(x, _count);
					y += _count;
				}
				else if (c == "/" || c == " ")
				{
					x++;
					y = 0;
				}
				else if (c == "K" || c == "Q" || c == "B" || c == "N" 
						|| c == "R" || c == "P" || c == "k" || c == "q" 
						|| c == "b" || c == "n" || c == "r" || c == "p")
				{
					this.draught(c, x);
					y++;
				}
				if (x > 7)
				{
					board = false;
					move = true;
				}
			}
			else
			{
				if (move)
				{
					if (c == "w" || c == "W")
					{
						this.user = "w";
					}
					else
					{
						this.user = "b";
					}
					move = false;
					castle = true;
					i++;
				}
				else if (castle)
				{
					if (c == "K")
					{
						this.Kcastle = true;
					}
					else if (c == "k")
					{
						this.kcastle = true;
					}
					else if (c == "Q")
					{
						this.Qcastle = true;
					}
					else if (c == "q")
					{
						this.qcastle = true;
					}
					else if (c == " ")
					{
						castle = false;
						enpassant = true;
					}
				}
				else if (enpassant)
				{
					if (c == " ")
					{
						enpassant = false;
						half = true;
					}
					else if (c != "-")
					{
						this.enpassant += c;
					}
				}
				else if (half)
				{
					this.half = parseInt(c, 10);
					half = false;
					full = true;
					i++;
				}
				else if (full)
				{
					this.full = parseInt(c, 10);
				}
			}
		}
	};

	this.code = function (size) {
		var code = "";
		if (size == null)
		{
			size = 250;
		}
		code += '<style type="text/css">#chessboard {width:' + size + 'px; height:' + size + 'px; font-size:' + (size/10) + 'px;} .cb-row {clear:both;} .white {background-color:#ffffff; width:10%; height:10%; font-size:100%; float:left; text-align:center;} .black {background-color:#a4a4a4; width:10%; height:10%; font-size:100%; float:left; text-align:center;} .cbtop-cell, .cbbottom-cell {background-color:#ecfa89; width:10%; height:5%; font-size:50%; float:left; text-align:center;} .cbleft-cell, .cbright-cell {background-color:#ecfa89; width:5%; height:10%; font-size:50%; float:left; text-align:center;} #bol,#bor,#tol,#tor {background-color:#ecfa89; width:5%; height:5%; font-size:50%; text-align:center;float:left;} .clickable {cursor:pointer;} .clicked {border:#ff0000 solid 1px;}</style>';
		code += '<div id="chessboard"><div id="cbtop-row" class="cb-row"><div id="tol">&nbsp;</div><div class="cbtop-cell" id="t1">1</div><div class="cbtop-cell" id="t2">2</div><div class="cbtop-cell" id="t3">3</div><div class="cbtop-cell" id="t4">4</div><div class="cbtop-cell" id="t5">5</div><div class="cbtop-cell" id="t6">6</div><div class="cbtop-cell" id="t7">7</div><div class="cbtop-cell" id="t8">8</div><div id="tor">&nbsp;</div></div>';
		var _class = true;
		for (var x=0;x<8;x++)
		{
			var _x = "abcdefgh".charAt(x);
			code += '<div class="cb-row"><div class="cbleft-cell" id="l' + _x + '">' + _x + '</div>';
			for (var y=0;y<8;y++)
			{
				code += '<div class="' + (_class?"black":"white") +  (this.clickable(x, y)?" clickable":"") + '" id="'+ _x + (y + 1) +'">' + this.codes[this.board[x][y]] + '</div>';
				_class = !_class;
			}
			code += '<div class="cbright-cell" id="r' + _x + '">' + _x + '</div></div>';
			_class = !_class;
		}
		code += '<div id="cbbottom-row" class="cb-row"><div id="bol">&nbsp;</div><div class="cbbottom-cell" id="bo1">1</div><div class="cbbottom-cell" id="bo2">2</div><div class="cbbottom-cell" id="bo3">3</div><div class="cbbottom-cell" id="bo4">4</div><div class="cbbottom-cell" id="bo5">5</div><div class="cbbottom-cell" id="bo6">6</div><div class="cbbottom-cell" id="bo7">7</div><div class="cbbottom-cell" id="bo8">8</div><div id="bor">&nbsp;</div></div></div>';

		return code;
	};

	this.clickable = function (x, y) {
		var position = this.board[x][y];
		if (position != "")
		{
			if ((this.user == "w" && position.toUpperCase() == position) ||
				(this.user == "b" && position.toLowerCase() == position))
			{
				return true;
			}
		}

		return false;
	};

	this.fen = function () {
		var fen = "";
		for (var x=0;x<8;x++ )
		{
			var count = 0;
			for (var y=0;y<8;y++ )
			{
				if (this.board[x][y] == "")
				{
					count++;
				}
				else 
				{
					if (count > 0)
					{
						fen += count;
					}
					fen += this.board[x][y];
					count = 0;
				}
			}
			if (count > 0)
			{
				fen += count;
			}
			if (x != 7)
			{
				fen += "/";
			}
		}

		fen += " ";

		fen += this.user;

		fen += " ";

		if (this.Kcastle)
		{
			fen += "K";
		}
		if (this.Qcastle)
		{
			fen += "Q";
		}
		if (this.kcastle)
		{
			fen += "k";
		}
		if (this.qcastle)
		{
			fen += "q";
		}

		fen += " ";

		fen += this.enpassant;

		fen += " ";

		fen += this.half;

		fen += " ";

		fen += this.full;

		return fen;
	}; 
}
