package com.party.boardlike.mapper;

import com.party.board.dto.BoardResponseDto;
import com.party.boardlike.dto.BoardLikeDto;
import com.party.boardlike.dto.BoardLikeResponseDto;
import com.party.boardlike.entity.BoardLike;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardLikeMapper {

    BoardLike boardLikePostDtoToBoardLike(BoardLikeDto.Post postDto);

    BoardLike boardLikeResponseDtoToBoardLike(BoardResponseDto responseDto);

    BoardLikeResponseDto boardLikeToBoardLikeResponseDto(BoardLike boardLike);

}
